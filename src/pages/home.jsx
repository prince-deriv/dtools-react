import { Button } from "@deriv-com/quill-ui";
import { LegacyIdNumberIcon } from "@deriv/quill-icons/Legacy";
import { usePage } from "../providers/pageProvider";
import { DerivLightAccountIcon } from "@deriv/quill-icons/Illustration";
import QuillTokenIcon from "../assets/images/quill-tokens.png";

const Home = () => {
  const { setCurrentPage } = usePage();

  const menus = [
    {
      icon: <LegacyIdNumberIcon fill="#fffff" iconSize="sm" />,
      action: () => {
        setCurrentPage("app-id-generator");
      },
      label: "App ID Generator",
    },
    {
      icon: <DerivLightAccountIcon height="120px" width="120px" />,
      action: () => {
        setCurrentPage("test-account-generator");
      },
      label: "Add Test Account",
    },
    {
      icon: <img alt="" src={QuillTokenIcon} />,
      action: () => {
        setCurrentPage("quill-tokens");
      },
      label: "Quill Tokens",
    },
  ];

  return (
    <div className="menu-container">
      {menus.map(({ label, action, icon }, mkey) => (
        <Button
          key={`menu-${label}-${mkey}`}
          icon={icon}
          color="black"
          label={label}
          className="menu-btn"
          size="sm"
          onClick={action}
        />
      ))}
    </div>
  );
};

export default Home;
