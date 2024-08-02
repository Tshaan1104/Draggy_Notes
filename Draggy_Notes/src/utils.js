/* eslint-disable no-unused-vars */

export const setNewOffset = (card, mouseMovedir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMovedir.x;
  const offsetTop = card.offsetTop - mouseMovedir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textaredref) => {
  const { current } = textaredref;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;
 
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};

export function bodyparser(value) {
  try {
      JSON.parse(value);
      return JSON.parse(value);
  } catch (error) {
      return value;
  }
}