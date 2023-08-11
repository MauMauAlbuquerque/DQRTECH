import express from 'express'
import knightsRoutes from './knightsRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => { res.status(200).json(
        {mensagem: "welcome to knights API"}
    )})

    app.use(express.json(), knightsRoutes)
}

export default routes