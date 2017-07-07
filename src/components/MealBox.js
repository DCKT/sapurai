// @flow

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

export type Food = {
  name: string,
  quantity: string
}

export type Meal = {
  title: string,
  id: number,
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
      <Card>
        <CardTitle title={title} />

        <CardActions>
          <RaisedButton primary label="Add food" />
        </CardActions>
      </Card>
    )
  }
}

export const MealBox = BaseMealBox
