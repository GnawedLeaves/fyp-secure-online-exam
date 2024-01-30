import styled from 'styled-components';

export const Internet = styled.div`
text-align: center;
margin-top: 20px;
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export const InternetText = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
`;

export const ProgressBarFill = styled.div`
  width: ${({ value, max }) => `${(value / max) * 100 > 100 ? 100 : (value / max) * 100}%`};
  height: 100%;
  background-color: ${({ value, max }) => {
    // Change colors based on download speed
    if (value <= 20) {
      return '#ff6666'; // Red for less than or equal to 20%
    } else if (value <= 50) {
      return '#ffd700'; // Yellow for less than or equal to 50%
    } else {
      return '#4caf50'; // Green for greater than 50%
    }
  }};
  border-radius: 5px;
  transition: width 0.5s ease;
`;
export const ButtonSection = styled.div`
display: flex;
justify-content: space-between;
gap: 10px;
`;