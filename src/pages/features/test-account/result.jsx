import { Breadcrumbs, Text, TextArea } from "@deriv-com/quill-ui";
import { usePage } from "../../../providers/pageProvider";
import CodeCopier from "../../../components/code-copier";

const TestAccountGeneratorResult = () => {
  const { pageData } = usePage();

  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "Test Account",
      href: "test-account-generator",
    },
    {
      content: "Code",
      href: "",
    },
  ];

  const getCode = () => {
    const { email, password, brokerCode, countryCode, accountType, currency } =
      pageData;

    return `perl create_account.pl ${email} ${password} ${brokerCode}  ${
      countryCode && countryCode.toLowerCase()
    }  ${currency} ${accountType} `;
  };

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <div className="form-container">
          <div className="code-container">
            <Text bold>New Account Code</Text>
            <TextArea
              value={getCode()}
              message={"Paste this code to your QA box"}
              size="sm"
              textAreaClassName="code-area"
              cols={6}
            />
          </div>
        </div>
      </div>
      <CodeCopier />
    </div>
  );
};

export default TestAccountGeneratorResult;
