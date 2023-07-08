'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

// components
import Input from '../Input/Input'
import SearchButton from '../Buttons/SearchButton/SearchButton'

const StyledContainer = styled.div``

const StyledInput = styled(Input)`
  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid #F6F6F6;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  display: inline-block;
  height: 76px;
  margin-bottom: 40px;
  padding: 0 30px;
  width: 100%;

  @media (min-width: 480px) {
    width: calc(100% - 100px);
  }
`

export default function Search () {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  function redirectToResults () {
    const query = inputValue.replace(/,/g, '').replace(/\s+/g, ',')
    const url = `/search/${query}/1`

    if (query.length) router.push(url)
  }

  return (
    <StyledContainer>
      <StyledInput
        className='search'
        id='search'
        placeholder='Im looking for...'
        value={inputValue}
        type='search'
        aria-label='Search through site content'
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.code === 'Enter' && Boolean(inputValue)) redirectToResults()
        }}
      />

      <SearchButton
        className={
          inputValue.length
            ? 'active'
            : 'inactive'
        }
        onClick={redirectToResults}
      >
        Search
      </SearchButton>
    </StyledContainer>
  )
}
