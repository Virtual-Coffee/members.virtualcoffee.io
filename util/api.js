export async function getContributorSubmission() {
	const response = await fetch('/api/forms/contributors', {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	if (!response.ok) {
		return null
	}
	return response.json()
}

export async function getMemberChallengeDataNovember({ queryKey }) {
	const id = queryKey[1]
	console.log({ id })
	const response = await fetch(
		`/api/forms/monthly-challenges/november${id ? '/' + id : ''}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
	)
	if (!response.ok) {
		return null
	}
	return response.json()
}

export async function getMaintainersSubmission() {
	const response = await fetch('/api/forms/maintainers', {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	if (!response.ok) {
		return null
	}
	return response.json()
}

export async function getMentorsSubmission() {
	const response = await fetch('/api/forms/mentors', {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
	if (!response.ok) {
		return null
	}
	return response.json()
}
