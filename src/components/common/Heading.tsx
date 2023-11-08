import React from 'react';

type Props = {
  heading: string;
  subHeading: string;
};

const Heading = (props: Props) => {
  const { heading, subHeading } = props;
  return (
    <div>
      <div className="page-heading">{heading}</div>
      <span className="sub-heading">{subHeading}</span>
    </div>
  );
};

export default Heading;
