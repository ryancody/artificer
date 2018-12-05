import React, { Component } from 'react'
import ResponseBox from './ResponseBox'

export default function Response () {
    this.show = false
    this.message = '...'
    this.success = false
    this.pending = true
    this.header = 'Pending'
    this.key = 0

    this.div = () => {
        return <ResponseBox key={this.key} response={this} />
    }

    this.update = (r) => {
        this.key++
        Object.assign(this,r)
    }


    this.setPending = () => {
        this.show = true
        this.success = false
        this.pending = true
        this.header = 'Pending'
        this.message = '...'
    }

    this.close = () => {
        this.show = false
        this.key++
    }
}