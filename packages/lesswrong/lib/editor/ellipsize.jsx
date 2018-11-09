import React, { Component } from 'react';
import truncatise from 'truncatise';
import { Utils } from 'meteor/vulcan:core';

const highlightMaxChars = 2400;
const excerptMaxChars = 300;

export const highlightFromMarkdown = (body, mdi) => {
  const htmlBody = mdi.render(body);
  return highlightFromHTML(htmlBody);
}

export const highlightFromHTML = (html) => {
  return Utils.sanitize(truncatise(html, {
    TruncateLength: highlightMaxChars,
    TruncateBy: "characters",
    Suffix: "... (Read More)",
  }));
};

export const excerptFromHTML = (html) => {
  const styles = html.match(/<style[\s\S]*?<\/style>/g) || ""
  const htmlRemovedStyles = html.replace(/<style[\s\S]*?<\/style>/g, '');

  return Utils.sanitize(truncatise(htmlRemovedStyles, {
    TruncateLength: excerptMaxChars,
    TruncateBy: "characters",
    Suffix: `... <a className="read-more">(Read More)</a>${styles}`,
  }));
};

export const excerptFromMarkdown = (body, mdi) => {
  const htmlBody = mdi.render(body);
  return excerptFromHTML(htmlBody);
}

export const renderExcerpt = ({key, body, htmlBody, classes, onReadMore}) => {
  if (!htmlBody)
    return null;

  const truncatedBody = excerptFromHTML(htmlBody);
  return <div
    className={classes.commentStyling}
    onClick={() => onReadMore()}
    dangerouslySetInnerHTML={{__html: truncatedBody}}
  />
};
