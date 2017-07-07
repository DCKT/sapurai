// @flow

import React from 'react'
import styled from 'styled-components'

const Container = styled.div`border: 1px solid #ccc;`

const Title = styled.h2`
  color: #282828;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
`

export type Food = {
  name: string,
  quantity: string
}

export type Meal = {
  title: string,
  foods?: Array<Food>
}

class BaseMealBox extends React.Component {
  props: { data: Meal };

  state = {
    aliments: []
  };

  render () {
    const { title, foods } = this.props.data

    return (
      <Container>
        <Title>
          {title}
        </Title>
      </Container>
    )
  }
}

export const MealBox = BaseMealBox
