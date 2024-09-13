import { Breadcrumbs, Text } from "@deriv-com/quill-ui";
import React, { Fragment, useEffect, useState } from "react";
import { usePage } from "../../../providers/pageProvider";
import { resolveVariable, searchInObject } from "../../../helpers";
import CodeCopier from "../../../components/code-copier";
import { LegacyCopy1pxIcon } from "@deriv/quill-icons";

const TokenDetails = () => {
  const { setCurrentPage, setPageData, pageData } = usePage();
  const [roots, setRoots] = useState([]);

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "Quill Tokens",
      href: "quill-tokens",
    },
    {
      content: "Details",
      href: "",
    },
  ];

  useEffect(() => {
    const { tokens = {}, selectedToken = null } = pageData;
    const roots = resolveVariable(selectedToken, tokens);
    setRoots(roots);
  }, []);

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="tree-box">
          {roots.map(({ key, value }, index) => {
            if (roots.length === 1) {
              return (
                <Fragment key={`tree-${index}-${key}`}>
                  <div className="tree-box-item">
                    <Text className="badge" size="sm">
                      {key}
                    </Text>
                    <div className="action-box">
                      <span className="action-item">
                        <textarea className="code-area">{key}</textarea>
                        <LegacyCopy1pxIcon />
                      </span>
                    </div>
                  </div>
                  <div className="tree-box-item connector">
                    <Text className="badge" size="sm">
                      {value}
                    </Text>
                    <div className="action-box">
                      <span className="action-item">
                        <textarea className="code-area">{value}</textarea>
                        <LegacyCopy1pxIcon />
                      </span>
                    </div>
                  </div>
                </Fragment>
              );
            }

            return (
              <Fragment key={`tree-${index}-${key}`}>
                <div
                  className={`tree-box-item ${index !== 0 ? "connector" : ""}`}
                >
                  <Text className="badge" size="sm">
                    {index === roots.length - 1 ? value : key}
                  </Text>
                  <div className="action-box">
                    <span className="action-item">
                      <textarea className="code-area">
                        {index === roots.length - 1 ? value : key}
                      </textarea>
                      <LegacyCopy1pxIcon />
                    </span>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
        <CodeCopier />
      </div>
    </div>
  );
};

export default TokenDetails;
