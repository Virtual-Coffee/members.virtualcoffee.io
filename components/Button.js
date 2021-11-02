import Link from 'next/link'
import classNames from '../util/classNames'

const defaultClassName =
	'font-semibold inline-block border border-transparent leading-6 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'

const colors = {
	primary:
		'text-white hover:text-white bg-orange-600 bg-gradient-to-br from-transparent to-pink-450 hover:bg-pink-450 transition duration-250 ease-in-out',
	utility: 'text-orange-600 hover:text-orange-500 bg-gray-50 hover:bg-gray-50',
}

const sizes = {
	sm: 'text-sm px-3 py-1',
	md: 'text-base px-5 py-3',
	lg: 'text-lg px-7 py-5',
}

export default function Button({
	external,
	href,
	size = 'md',
	color = 'primary',
	className: providedClassname = '',
	...props
}) {
	props.className = classNames(
		defaultClassName,
		sizes[size],
		colors[color],
		providedClassname
	)

	if (href) {
		if (external) {
			return <a href={href} {...props} />
		}
		return (
			<Link href={href}>
				<a {...props} />
			</Link>
		)
	}

	return <button {...props} />
}
