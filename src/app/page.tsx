'use client'

import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// importing components
import CallToActionButton from './components/Buttons/CallToActionButton/CallToActionButton'
import Category from './components/Category/Category'
import ItemsList from './components/ItemsList/ItemsList'
import Pagination from './components/Pagination/Pagination'
import Search from './components/Search/Search'
import Wrapper from './components/Wrapper/Wrapper'

// API host config
import { db } from '../../firebase-config'

import styles from './page.module.scss'

export default function Home (): JSX.Element {
  const [categories, setCategories] = useState([])
  const categoriesCollectionRef = collection(db, 'categories')

  const getCategories = async () => {
    const data = await getDocs(categoriesCollectionRef)
    setCategories(data.docs.map((category) => ({ ...category.data(), id: category.id })))
  }

  const [subcategories, setSubcategories] = useState([])
  const subcategoriesCollectionRef = collection(db, 'subcategories')

  const getSubcategories = async () => {
    const data = await getDocs(subcategoriesCollectionRef)
    setSubcategories(data.docs.map((subcategory) => ({ ...subcategory.data(), id: subcategory.id })))
  }

  const items = [
    {
      id: 1,
      url: '/item/93',
      title: 'Apartament cu trei odăi',
      subcategory: 'Apartamente'
    }
  ]

  useEffect(() => {
    getCategories()
    getSubcategories()
  }, [])

  // class IndexPage extends Component {
  // state = {
  //   categories: [],
  //   subcategories: [],
  //   items: [],
  //   page: null,
  //   totalItems: null
  // }

  // fetchItems () {
  //   const pageNumber = this.props.match.params.pageNumber || 1

  //   window
  //     .fetch(`${apiHost}/index.php?page=${pageNumber}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         items: data.items,
  //         page: data.page,
  //         totalItems: data.total
  //       })
  //     })
  //     .catch(err => console.error(err))
  // }

  // componentDidUpdate (prevProps) {
  //   if (prevProps.location.key !== this.props.location.key) {
  //     this.fetchItems()
  //   }
  // }

  return (
    <Wrapper>
      <Search />

      <div className={styles.categories}>
        {categories.length > 0 && categories.map(category =>
          <Category
            key={category.id}
            id={category.id}
            subcategories={subcategories}
            name={category.name}
          />
        )}
      </div>

      <ItemsList items={items} />

      {/* <Pagination
        pageNumber={page}
        totalItems={totalItems}
      /> */}

      <Link
        className='publish-item-button-link'
        href='/item/add'
      >
        <CallToActionButton
          id='call-to-action'
          title='Post an ad'
        />
      </Link>
    </Wrapper>
  )
}
