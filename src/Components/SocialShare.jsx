import React from 'react';
import styled from 'styled-components';

export const SocialShare = ({ url }) => {
  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(`Check out this link: ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`);
  };

  const shareOnFacebook = () => {
    const encodedUrl = encodeURIComponent(url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
  };

  return (
    <SocialShareWrapper>
      <SocialShareButton onClick={shareOnTwitter}>Share on Twitter</SocialShareButton>
      <SocialShareButton onClick={shareOnFacebook}>Share on Facebook</SocialShareButton>
    </SocialShareWrapper>
  );
};

const SocialShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const SocialShareButton = styled.button`
  padding: 10px;
  margin: 10px;
  background: #586151;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #939e8a;
  }
  &:focus {
    box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
    outline: 0;
  }
`;

export default SocialShare;