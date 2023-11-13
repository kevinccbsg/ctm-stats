import { useEffect, useState } from "react";
import { userStats } from "../../api";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserResultTable from "../../components/UserResultTable/UserResultTable";

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
  const [data, setData] = useState<Data>();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    if (value) {
      userStats(parseInt(value, 10))
        .then(data => {
          setData(data);
        })
        .catch(error => console.log(error))
    }
  }, [value]);
  return (
    <MainContainer>
      <Typography.Title level={1}>Player profiles</Typography.Title>
      <SearchUser
        placeholder="Search player"
        style={{ width: 200 }}
        value={value}
        setValue={setValue}
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
