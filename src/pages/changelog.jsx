import { Breadcrumbs, SectionMessage, Text } from "@deriv-com/quill-ui";
import { StandaloneFileCircleInfoRegularIcon } from "@deriv/quill-icons";

const Changelog = () => {
  const links = [
    {
      content: "Home",
      href: "home",
    },
    {
      content: "Changelog",
    },
  ];

  return (
    <div className="content-container">
      <Breadcrumbs size="sm" links={links} />
      <div className="scroll-container">
        <SectionMessage
          icon={<StandaloneFileCircleInfoRegularIcon iconSize="sm" />}
          message="We have moved from Grunt to React and now powered by Quill UI"
          size="sm"
          status="info"
          title="Dtools is back"
        />
        <div className="log-container">
          <div className="log-item">
            <Text bold size="sm">
              1.0.1
            </Text>
            <Text size="sm">Added settings with dark mode</Text>
          </div>
          <div className="log-item">
            <Text bold size="sm">
              1.0.0
            </Text>
            <Text size="sm">
              Migrated App ID and Account creation from old Dtools
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
