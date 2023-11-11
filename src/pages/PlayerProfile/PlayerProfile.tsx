import { useEffect, useState } from "react";
import { userStats } from "../../api";
import MainContainer from "../../Layouts/MainContainer/MainContainer";
import { Typography } from "antd";
import ScoreTable from "../../components/ScoreTable/ScoreTable";

const PlayerProfile = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    userStats(88)
      .then(data => {
        if (data) {
          setData(data);
          console.log(data.results);
          
        }
      })
      .catch(error => console.log(error))
  }, []);
  return (
    <MainContainer>
      <Typography.Title level={1}>Player profiles</Typography.Title>
      {data && (
        <div>
          <Typography.Title level={3}>{data.user.name}</Typography.Title>
          <ScoreTable title="Games" data={data.results} />
        </div>
      )}
    </MainContainer>
  );
};

export default PlayerProfile;
