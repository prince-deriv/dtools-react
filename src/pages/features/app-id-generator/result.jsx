import { Breadcrumbs, Text, TextArea } from "@deriv-com/quill-ui";
import { usePage } from "../../../providers/pageProvider";
import CodeCopier from "../../../components/code-copier";

const AppIdGeneratorResult = () => {
  const { pageData } = usePage();

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "App ID Generator",
      href: "app-id-generator",
    },
    {
      content: "Code",
      href: "",
    },
  ];

  const buildAppIdQuery = (query, key) => {
    const get_query = `select (id) from oauth.apps where name='${key}';`;
    const final_query = `echo $"${query}; ${get_query};" | sudo -u pgadmin psql -U pgadmin service=auth01`;

    return final_query;
  };

  const getCode = () => {
    const now = new Date();
    const epoch = Math.round(now.getTime() / 1000);
    const prefix = pageData?.prefix;
    const key = `${prefix}-${epoch}`;

    const link = pageData?.link.replace(/\s+/g, "");

    const derivQuery = `insert into oauth.apps (name, binary_user_id, active, redirect_uri, scopes, verification_uri) values ('${key}', 1, true, '${link}', '{read,admin,trade,payments}', '${link}/redirect');`;
    const binaryQuery = `insert into oauth.apps (name, binary_user_id, active, redirect_uri, scopes, verification_uri) values ('${key}', 1, true, '${link}/en/logged_inws.html', '{read,admin,trade,payments}', '${link}/en/redirect.html');`;
    const webtraderQuery = `insert into oauth.apps (name, binary_user_id, active, redirect_uri, scopes, verification_uri) values ('${key}', 1, true, '${link}', '{read,admin,trade,payments}', '${link}');`;

    return {
      deriv: buildAppIdQuery(derivQuery, key),
      binary: buildAppIdQuery(binaryQuery, key),
      webtrader: buildAppIdQuery(webtraderQuery, key),
    };
  };

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="form-container">
          <div className="code-container">
            <Text bold>Deriv App</Text>
            <TextArea
              value={getCode().deriv}
              message={"Paste this code to your QA box"}
              size="sm"
              textAreaClassName="code-area"
              cols={8}
            />
          </div>
          <div className="code-container">
            <Text bold>Binary </Text>
            <TextArea
              value={getCode().binary}
              message={"Paste this code to your QA box"}
              size="sm"
              textAreaClassName="code-area"
              cols={8}
            />
          </div>
          <div className="code-container">
            <Text bold>Webtrader </Text>
            <TextArea
              value={getCode().webtrader}
              message={"Paste this code to your QA box"}
              size="sm"
              textAreaClassName="code-area"
              cols={8}
            />
          </div>
        </div>
      </div>
      <CodeCopier />
    </div>
  );
};

export default AppIdGeneratorResult;
