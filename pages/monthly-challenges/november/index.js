import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Form, { FormLayout } from '@/components/Forms'
import SignIn from '@/components/SignIn'
import { useQuery } from 'react-query'
import Button from '@/components/Button'
import { getMemberChallengeDataNovember } from '@/util/api'

// Become a Contributor: Virtual Coffee Hacktoberfest Initiative

{
	/* <Head>
			<title>Thank you for your interest!</title>
		</Head> */
}

export function NoAuth() {
	return (
		<FormLayout title="November Monthly Challenge" description="text here">
			<SignIn />
		</FormLayout>
	)
}

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()
	const router = useRouter()
	const { error, message: errorMessage } = router.query

	const articlesResponse = useQuery(
		'memberChallengeDataNovember',
		getMemberChallengeDataNovember,
		{ enabled: sessionStatus === 'authenticated' }
	)

	console.log({ articlesResponse })

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return <NoAuth />
	}

	if (!(articlesResponse.isSuccess || articlesResponse.isError)) {
		return null
	}

	return (
		<FormLayout title="November Monthly Challenge" description="YOLO">
			<div className="text-center">
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Add your blog posts!
				</h1>
				<p className="mt-4 text-lg leading-6 text-gray-500">
					Any writing that was published in November 2021 will count towards our
					goal!
				</p>
			</div>

			{articlesResponse.data.results.length && (
				<>
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg font-medium text-gray-900">
							Your Articles:
						</h3>
					</div>
					<div className="flex flex-col">
						<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Article
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Count
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Date
												</th>
												<th scope="col" className="relative px-6 py-3">
													<span className="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{articlesResponse.data.results.map(
												(article, articleIndex) => (
													<tr
														key={article.id}
														className={
															articleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
														}
													>
														<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
															<a href={article.Url}>{article.Title}</a>
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{article['Word Count']}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{article['Date Published']}
														</td>
														<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
															<a
																href={`/monthly-challenges/november/${article.id}`}
																className="text-indigo-600 hover:text-indigo-900"
															>
																Edit
															</a>
														</td>
													</tr>
												)
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			<div className="text-lg leading-6 text-gray-500">
				<p className="mt-4">
					<Button size="lg" href="/monthly-challenges/november/new">
						Add New Post!
					</Button>
				</p>
			</div>
		</FormLayout>
	)
}
