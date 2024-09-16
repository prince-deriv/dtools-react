import {
  Breadcrumbs,
  SearchField,
  SectionMessage,
  Skeleton,
  Text,
  Tooltip,
} from "@deriv-com/quill-ui";
import React, { Fragment, useEffect, useState } from "react";
import { usePage } from "../../../providers/pageProvider";
import {
  LegacyCopy1pxIcon,
  StandaloneFileCircleInfoRegularIcon,
} from "@deriv/quill-icons";
import { searchInObject } from "../../../helpers";
import CodeCopier from "../../../components/code-copier";

const UserGroups = () => {
  const { setCurrentPage, setPageData, pageData } = usePage();
  const [tokens, setTokens] = useState(pageData?.tokens || {});
  const [search, setSearch] = useState(pageData?.searchKey || "");
  const [results, setResults] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "User Groups",
      href: "user-groups",
    },
  ];

  useEffect(() => {
    if (search) {
      const results = searchInObject(tokens, search, 50);
      setResults(results);
      setPageData({
        tokens,
        searchKey: search,
      });
    }
  }, [search]);

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        {isLoading ? (
          <Skeleton.Container direction="column">
            <Skeleton.Square rounded height={40} />
            <Skeleton.Square rounded height={100} />
            <Skeleton.Square rounded height={100} />
          </Skeleton.Container>
        ) : (
          <>
            <SearchField
              placeholder="Search for username"
              size="sm"
              onChange={(e) => setSearch(e.target.value)}
              variant="fill"
            />

            {results.length > 0 ? (
              <div className="search-result-container">
                {results.map(({ key }) => {
                  return (
                    <div className="search-result-item" key={`token-${key}`}>
                      <span
                        onClick={() => {
                          setPageData({
                            selectedToken: key,
                          });
                          setCurrentPage("token-details");
                        }}
                      >
                        <Text size="sm" bold>
                          {key}
                        </Text>
                      </span>
                      <div className="action-box">
                        <span className="action-item">
                          <textarea className="code-area">{key}</textarea>
                          <LegacyCopy1pxIcon />
                        </span>
                      </div>
                    </div>
                  );
                })}
                <CodeCopier />
              </div>
            ) : (
              <SectionMessage
                icon={<StandaloneFileCircleInfoRegularIcon iconSize="sm" />}
                message="You can search for the variable key or value to indentify a specific token. Click on the item to view details of the token"
                size="sm"
                status="info"
                title="Token search"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserGroups;
