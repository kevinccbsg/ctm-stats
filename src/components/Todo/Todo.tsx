// This will be removed after completing all the pages
import { Image, Typography } from "antd";
import logo from '../../assets/ctm_logo.png';
import MainContainer from "../../Layouts/MainContainer/MainContainer";

const Todo = () => (
  <MainContainer>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      height: '80dvh',
    }}>
      <Image preview={false} src={logo} />
      <Typography.Title>Page under construction</Typography.Title>
    </div>
  </MainContainer>
);

export default Todo;
