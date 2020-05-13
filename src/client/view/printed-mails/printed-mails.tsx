import React from "react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { getMails } from "./mails-selectors";

export const PrintedMails: FunctionComponent<{}> = () => {

  const mails = useSelector(getMails);

  return (<span>{`Here will be table ${mails[0].date}`}</span>);
};
