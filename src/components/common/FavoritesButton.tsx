'use client'

import { ArticleItem } from '@/types/server'
import { fetchWrapper } from '@/utils/fetch'
import { useState } from 'react'

interface FavoritesButtonProps {
  article: any
  className?: string
  text?: string
  onChange?: (favorite: ArticleItem) => void
}

const FavoritesButton = ({
  article,
  className,
  text,
  onChange,
}: FavoritesButtonProps) => {
  const { favorited, favoritesCount, slug } = article
  const [loading, setLoading] = useState(false)

  const handleFavorites = async () => {
    setLoading(true)
    try {
      const data = favorited
        ? await fetchWrapper<ArticleItem>(
            `/articles/${slug}/favorite`,
            'DELETE',
          )
        : await fetchWrapper<ArticleItem>(`/articles/${slug}/favorite`, 'POST')

      if (data) {
        onChange && onChange(data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleFavorites}
      disabled={loading}
      className={`${className} ${
        favorited ? 'btn-primary' : 'btn-outline-primary'
      }`}
    >
      <i className="ion-heart"></i>
      {text ? (
        <>
          &nbsp; {text} <span className="counter">({favoritesCount})</span>
        </>
      ) : (
        <>&nbsp; {favoritesCount}</>
      )}
    </button>
  )
}
export default FavoritesButton
