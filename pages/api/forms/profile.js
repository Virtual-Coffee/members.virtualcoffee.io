// This is an example of to protect an API route
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import {
	createOrUpdateForm,
	findFormResult,
	updateUserProfile,
} from '../util/airtable'
import * as formData from '../../../data/forms'

const secret = process.env.SECRET

export default async (req, res) => {
	const session = await getSession({ req })
	const token = await getToken({ req, secret })

	if (session && token?.auth_id) {
		switch (req.method) {
			case 'PUT':
				const data =
					typeof req.body === 'string' ? JSON.parse(req.body) : req.body

				const errors = []

				const requiredFields = [
					'agree',
					...formData.profile
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
							'/mentors?error=1&message=Please fill out all required fields.'
						)
					}
					return
				}

				const updateProfileResult = await updateUserProfile(
					token.auth_id,
					session.profile.profile_id,
					data
				)

				// console.log(formRowResult)

				if (req.headers.accept === 'application/json') {
					res.send({
						success: true,
						fields: {
							...updateProfileResult.fields,
						},
					})
				} else {
					res.redirect(303, '/')
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
