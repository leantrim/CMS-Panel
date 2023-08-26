import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type Props = {
  title: string;
  value: string;
};

const SectionHeader = (props: Props) => {
  const { title, value } = props;

  return (
    <Container>
      <Span>{value}</Span>
    </Container>
  );
};

const Span = styled.span`
  color: #514545;
  font-style: italic;
  letter-spacing: 1px;
  font-size: 22px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

export default SectionHeader;
