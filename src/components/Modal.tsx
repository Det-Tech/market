import React from 'react'
import useOutsideClick from '../hooks/useOnClickOutside'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 6rem);
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  @keyframes wrapper-appear2 {
    0% { transform: scale(.9); }
    100% { transform: scale(1); }
  }
  padding: 20px;
  border: 1px solid white;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 100;
  max-width: min(100%, 500px);
  border-radius: 10px;
  background: #FFFFFF;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  flex: 1;
  padding-bottom: 20px;
  animation: wrapper-appear2 .3s;
  color: black;
`

const StyledModal = styled.div`
  @keyframes appear {
    0% { opacity: 0;}
    100% { opacity: 1;}
  }

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity linear 150ms;
  background: rgba(255, 255, 255, 0.6);
  z-index: 100;
  overflow-y: auto;
  height: 100vh;
  animation: appear .3s;

  & button.close {
    margin: 0;
    position: absolute;
    cursor: pointer;
    right: 10px;
    top: 10px;
    border: none;
    z-index: 11;
    opacity: .75;
    transition: opacity .2s, background .2s;
    background: transparent;
    border-radius: 50%;
    width: 2em;
    height: 2em;
    &:hover {
      opacity: 1;
      background: #ffffff22;
    }
    & svg {
      color: white;
      vertical-align: middle;
      width: 50%;
      translate: 50%;
    }
  }
`

export function Modal({ children, onClose }) {
  React.useEffect(
    () => {
      const oldValue = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.style.marginRight = "17px";
      return () => {
        document.body.style.overflow = oldValue
        document.body.style.marginRight = "0px";
      }
    },
    [],
  )

  const ref = React.useRef()

  useOutsideClick(ref, () => onClose && onClose())

  return (
    <StyledModal>
      <Container>
        <Wrapper ref={ref}>
          {onClose && (
            <button className="close" onClick={onClose}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 242 242"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M241.208 29.076 212.924.792 121 92.716 29.076.792.792 29.076 92.716 121 .792 212.924l28.284 28.284L121 149.284l91.924 91.924 28.284-28.284L149.284 121z"
                  fill="currentColor"
                />
              </svg>
            </button>
          )}
          {children}
        </Wrapper>
      </Container>
    </StyledModal>
  )
}
