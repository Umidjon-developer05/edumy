import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs {
				title
				createdAt
				author {
					name
					image {
						url
					}
				}
				category {
					name
					slug
				}
				description
				tag {
					name
					slug
				}
				image {
					url
				}
				content {
					html
				}
				slug
			}
		}
	`

	const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
	return blogs
}

export const getDetailedBlog = cache(async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			blogs(where: { slug: $slug }, locales: en) {
				author {
					name
					image {
						url
					}
					bio
					id
				}
				content {
					html
				}
				createdAt
				image {
					url
				}
				slug
				tag {
					name
					slug
				}
				category {
					name
					slug
				}
				title
			}
		}
	`

	const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query, {
		slug,
	})
	return blogs?.[0]
})
