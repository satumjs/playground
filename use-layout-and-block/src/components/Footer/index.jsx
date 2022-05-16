import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '平头哥前端团队出品',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Satumjs',
          title: 'Satumjs',
          href: 'https://satumjs.github.io/website',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/satumjs',
          blankTarget: true,
        },
        {
          key: 'examples',
          title: 'examples',
          href: 'https://stackblitz.com/@valleykid',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
