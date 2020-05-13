import express from 'express';
import bodyParser from 'body-parser';
import {TSearchEndpointRequest, TSearchEndpointResponse} from "../common/search-endpoint";
import _ from "lodash";
import fs from 'fs';
import {calcWidth} from "./calc-width";
import {
    PUBLIC_CTX_PATH,
    IMAGE_INFO_SEARCH_ENDPOINT_PATH,
    IMAGE_INFO_DELETE_ENDPOINT_PATH, IMAGE_INFO_PUT_ENDPOINT_PATH
} from "../common/endpoints"

import {TDeleteEndpointResponse} from "../common/delete-endpoint";
import Unsplash, {toJson} from 'unsplash-js';
import "isomorphic-fetch"
import {TAuthorUpdateEndpointRequest, TAuthorUpdateEndpointResponse} from "../common/update-endpoint";
import {ParamsDictionary} from "express-serve-static-core";

export const unsplashJsonPath = './data/unsplash.json';
export const PORT = process.env.PORT || 8000;
export const app = express();
export const v300QueryString = '&h=300&fit=max';

//
// load image metadata from:
// https://images.unsplash.com/
//
let metaImagesDatabase: any[] = [];

if (fs.existsSync(unsplashJsonPath)) {
    metaImagesDatabase = JSON.parse(fs.readFileSync(unsplashJsonPath).toString());
    console.log('--> ' + metaImagesDatabase.length + " elements have been read from: " + unsplashJsonPath);
} else {
    const promises: Promise<any>[] = [];
    const unsplash = new Unsplash({accessKey: "ddQIP6_Y11G_Ft8NVC4q4iVHEyXhkQDsT-KoQeOIqNs"});
    _.range(1, 21).forEach((i) => {
        promises.push(
            unsplash.search.photos("dog", i, 30)
                .then(toJson)
                .then((data: any) => {
                    metaImagesDatabase.push(...data.results);
                    console.log(`--> Response for page number: ${i}, page size: ${data.results.length}, current total: ${metaImagesDatabase.length}`);
                }))
    });
    Promise.all(promises)
        .then(() => {
            fs.writeFileSync(unsplashJsonPath, JSON.stringify(metaImagesDatabase));
            console.log('--> ' + metaImagesDatabase.length + " elements have been saved to: " + unsplashJsonPath);
        });
}

//
// Images Preprocessing
//
// Image processing is not needed because https://images.unsplash.com/ already provides preprocessed images
// if you add '&h=300&fit=max' to image url
//

app.use(bodyParser.json());
app.use(PUBLIC_CTX_PATH, express.static("public"));
app.use('/', express.static("build"));

app.post<{}, TSearchEndpointResponse, TSearchEndpointRequest>(IMAGE_INFO_SEARCH_ENDPOINT_PATH, (req, res) => {
    const found = _.filter(metaImagesDatabase, it => _.includes(it.user.name.toLowerCase(), req.body.search.toLocaleLowerCase()));
    const results = _.map(found, (item => {
        return {
            id: item.id,
            downloadUrl: item.urls.full,
            width: item.width,
            height: item.height,
            author: item.user.name,
            imageV300Url: item.urls.full + v300QueryString,
            widthV300: calcWidth(300, item.width, item.height)
        }
    }));
    res.send(results)
});

app.delete<ParamsDictionary, TDeleteEndpointResponse, {}>(IMAGE_INFO_DELETE_ENDPOINT_PATH + '/:id', (req, res) => {
    const id = req.params.id;
    _.remove(metaImagesDatabase, {"id": id});
    res.send({id})
});

app.put<{}, TAuthorUpdateEndpointResponse, TAuthorUpdateEndpointRequest>(IMAGE_INFO_PUT_ENDPOINT_PATH, (req, res) => {
    const id = req.body.id;
    const author = req.body.author;

    const dataToChange = _.find(metaImagesDatabase, {"id": id});

    if (dataToChange) {
        dataToChange.user.name = author;
    }

    setTimeout(() => {
        res.send({id, author});
    }, 1000);
});

console.log(`Server is started on port ${PORT}`);
app.listen(PORT);




