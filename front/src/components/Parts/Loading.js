import React from 'react';

const Loading = () => {
  return (
    <div id="loading">
      <div class="loading-bg"></div>
      <div class="loading-img">
        <img src="/images/loading/loading-img@2x.png" alt='loading imaage' />
        <span>Loading...</span>
      </div>
      <div class="loading-drops">
        <img src="/images/loading/loading-drop@2x.png" alt='loading drop' />
        <img src="/images/loading/loading-drop@2x.png" alt='loading drop' />
        <img src="/images/loading/loading-drop@2x.png" alt='loading drop' />
        <img src="/images/loading/loading-drop@2x.png" alt='loading drop' />
        <img src="/images/loading/loading-drop@2x.png" alt='loading drop' />
      </div>
    </div>
  )
};

export default Loading;
