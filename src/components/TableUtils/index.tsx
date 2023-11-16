import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";

export const LinkColumn = ({ value }: { value: string | null }) => value ? (
  <a href={value} target='_blank' rel="noopener noreferrer"><VideoCameraOutlined /></a>
): (<span>No link</span>)

export const NumberColumn = ({ value }: { value: number }) => <Typography.Text strong style={{ color: '#20e128'}}>{value}</Typography.Text>;

export const AvatarColumn = ({ image, value }: { image: string | null; value: string }) => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
    <Avatar
      size={40}
      src={image}
      icon={<UserOutlined />}
    />
    <Typography.Text strong>{value}</Typography.Text>
  </div>
);

export const TableTitle = ({ title }: { title: string }) => <Typography.Title style={{ minHeight: 68 }} level={4}>{title}</Typography.Title>;
