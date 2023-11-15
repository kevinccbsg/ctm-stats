import { useEffect, useState } from "react";
import { userStats } from "../../api";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import { Avatar, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserResultTable from "../../components/UserResultTable/UserResultTable";
import { useSearchParams } from "react-router-dom";

interface Data {
  results: {
      id: number;
      link: string | null;
      description: string;
      score: string;
  }[];
  user: {
    id: number;
    name: string;
    profile_picture_url: string | null;
  };
}

const PlayerProfile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams({});
  const [data, setData] = useState<Data>();
  const [value, setValue] = useState<string | null>(searchParams.get('player_filter'));
  useEffect(() => {
    const urlPlayer1 = searchParams.get('player');
    if (urlPlayer1) {
      userStats(parseInt(urlPlayer1, 10))
        .then(data => {
          setData(data);
        })
        .catch(() => {
          messageApi.open({
            type: 'error',
            content: 'Error fetching user info'
          });
        });
    }
  }, [searchParams, messageApi]);
  return (
    <MainContainer>
      {contextHolder}
      <Typography.Title level={1}>Player profiles</Typography.Title>
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={value}
        setValue={setValue}
        persistenceOptions={{
          id: 'player',
          label: 'player_filter',
        }}
      />
      {(data && value) && (
        <div>
          <Typography.Title level={3}>{data.user.name}</Typography.Title>
          <Avatar
            size={130}
            src={data.user.profile_picture_url}
            icon={<UserOutlined />}
          />
          <UserResultTable
            title={`Lifetime Games by ${data.user.name} in Chronological Order`}
            data={data.results}
          />
        </div>
      )}
    </MainContainer>
  );
};

export default PlayerProfile;
