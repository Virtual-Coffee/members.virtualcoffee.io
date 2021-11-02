import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import {
	Card,
	CardHeader,
	CardHeaderActions,
	CardHeaderHeader,
	CardList,
	CardListItem,
	CardListItemValue,
	CardListItemKey,
} from '@/components/Card'
import Container from '@/components/Container'
import Button from '@/components/Button'
import SignIn from '@/components/SignIn'

export default function Page() {
	const { data: session, status: sessionStatus } = useSession()

	if (sessionStatus === 'loading') {
		return null
	}

	if (sessionStatus === 'unauthenticated') {
		return (
			<Layout>
				<Container>
					<h1 className="text-center text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
						Virtual Coffee:
						<br className="xl:hidden" />
						<span className="text-orange-500"> Monthly Challenges</span>
					</h1>

					<SignIn />
				</Container>
			</Layout>
		)
	}

	return (
		<Layout title="VC Hacktoberfest Dashboard">
			<Container>
				<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
					Virtual Coffee Monthly Challenges
				</h1>
				<p className="mt-4 mb-8 text-lg leading-6 text-gray-500">
					Every month we have a monthly challenge - here's the spot to
					participate!
				</p>
				<div className="space-y-12">
					<Card>
						<CardHeader>
							<CardHeaderHeader
								title="November 2021: NaNoWriMo!"
								description={
									<div className="prose">
										<p>
											📣 Challengers!!! It's November 1st and time for a new
											challenge! Just like last year, this month's challenge
											is **blogging**!
										</p>
										<p>
											Last year our common goal was to reach 50k words during
											the month and we didn't quite reach it, but there is no
											doubt we will this year! The themes for blogging are up to
											you, let's just try to keep a connection with the dev
											world.
										</p>
										<p>
											You can find a 
											<a href="https://virtualcoffee.io/monthlychallenges/nov-2021/">
												lot of ideas on the website
											</a>
											 to help you.
										</p>
										<p>
											If you are new to blogging and need advice on the
											platform, the style, the sharing part, have proofreading,
											... our community is here to help. Use this channel 
											<a href="https://virtual-coffee-group.slack.com/archives/C01GN2TLLC8">
												<code>#content-creation</code>
											</a>
											 to post your questions, share your articles.
										</p>
										<p>Write a lot, write often! Good luck, and have fun!</p>
									</div>
								}
							/>
							<CardHeaderActions>
								<Button size="md" href="/monthly-challenges/november">
									Add your blog posts!
								</Button>
								<Button
									size="md"
									href="https://virtualcoffee.io/monthlychallenges/nov-2021/"
									target="_blank"
									rel="nofollow"
								>
									View Challenge Page
								</Button>
							</CardHeaderActions>
						</CardHeader>
						<CardList>
							<CardListItem>
								<CardListItemKey>Current Challenge</CardListItemKey>
								<CardListItemValue>
									<strong>November, 2021: NaNoWriMo!</strong> This month we're
									working together to blog 50,000 words! Based off the
									<a href="https://nanowrimo.org/">
										NaNoWriMo (National Novel Writing Month) Challenge
									</a>
									, we'll be doing the tech take on writing and working together
									towards the goal while posting on our own blogs.
								</CardListItemValue>
							</CardListItem>
						</CardList>
					</Card>
				</div>
			</Container>
		</Layout>
	)
}
