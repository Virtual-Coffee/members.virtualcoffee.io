// This is an example of to protect an API route
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import {
	createOrUpdateMemberArticle,
	findMonthlyChallengeDataRowNovember,
	updateUserProfile,
} from '../../../util/airtable'
import * as formData from '../../../../../data/forms'

const secret = process.env.SECRET

export default async (req, res) => {
	const session = await getSession({ req })
	const token = await getToken({ req, secret })

	const { rowId } = req.query

	if (session && token?.auth_id) {
		switch (req.method) {
			case 'PUT':
				const data =
					typeof req.body === 'string' ? JSON.parse(req.body) : req.body

				const errors = []

				const requiredFields = [
					...formData.monthlyChallengeNovember
						.filter((field) => !!field.required)
						.map((field) => field.name),
				]

				requiredFields.forEach((field) => {
					if (!data[field]) {
						errors.push({
							field,
							message: `${field} is required.`,
						})
					}
				})

				if (errors.length) {
					if (req.headers.accept === 'application/json') {
						res.status(409).send({
							success: false,
							message: 'Please fill out all required fields.',
							errors,
						})
					} else {
						res.redirect(
							303,
							'/monthly-challenges/november?error=1&message=Please fill out all required fields.'
						)
					}
					return
				}

				// const updateProfileResult = await updateUserProfile(
				// 	token.auth_id,
				// 	session.profile.profile_id,
				// 	data
				// )

				// console.log(updateProfileResult)

				const formRowResult = await createOrUpdateMemberArticle(
					token.auth_id,
					data,
					rowId
				)

				// console.log(formRowResult)

				if (req.headers.accept === 'application/json') {
					res.send({
						success: true,
						fields: {
							...formRowResult.fields,
						},
					})
				} else {
					res.redirect(303, '/monthly-challenges/november')
				}

				break

			case 'GET':
				if (!req.headers.accept === 'application/json') {
					res.status(400).send({ message: 'Bad request' })
					return
				}

				const result = await findMonthlyChallengeDataRowNovember(
					token.auth_id,
					rowId
				)

				if (result) {
					res.send({
						success: true,
						fields: result.fields,
					})
				} else {
					res.status(404).send({ success: false, message: 'Not found.' })
				}

				break
			default:
				res.status(405).send({ message: 'Requests method not allowed.' })
		}
	} else {
		res.send({
			error: 'You must be sign in to view the protected content on this page.',
		})
	}
}
