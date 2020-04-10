import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import myAxios from '../../../webServer.js'

const initialState = { isLoading: false, results: [], value: '' }

class RestaurantSelect extends Component {
    state = initialState

    handleResultSelect = (e, { result }) => {
        this.setState({ value: '' })
        console.log(typeof (result.title))
        if (result.title.includes("[")) {
            result.title = result.title.split("[")[1].split("]")[0]
        }
        this.props.whenselect(result.title)
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        console.log("Props.foodcategories: ", this.props.foodCategories)

        myAxios.post('food_and_restaurants_filtered', {
            keyword: value,
            foodCategories: this.props.foodCategories
        })
            .then(response => {
                console.log(response);
                if (this.state.value.length < 1) {
                    this.setState(initialState)
                } else {
                    const res = []
                    response.data.result.forEach(element => {
                        res.push({
                            'title': element[0]
                        })
                    });
                    this.setState({
                        isLoading: false,
                        results: res
                    })
                    console.log(this.state.results)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                            leading: true,
                        }
                        )}
                        onSelectionChange={this.handleSelectionChange}
                        results={results}
                        value={value}
                        {...this.props}
                        placeholder='Select Restaurant'
                    >
                    </Search>
                </Grid.Column>
                <Grid.Column width={10}>
                </Grid.Column>
            </Grid>
        )
    }
}

export default RestaurantSelect