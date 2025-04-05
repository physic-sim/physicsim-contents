import { useState } from 'react'
import sims from '../data/simulations'
import styles from '../styles/SimSearch.module.css'

const filterSims = query => {
  if (query == '') {
    return sims
  }
  return sims.filter(sim => {
    return sim.title.toLowerCase().includes(query.toLowerCase()) ||
      sim.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  })
}

export default function SimSearch() {
  const [query, setQuery] = useState('')
  const filtered = filterSims(query)
  
  return (
    <div className={styles.simsearchWrapper}>
      <div className={styles.simsearchContainer}>
        <input 
          className={styles.simsearchInput}
          type="text" 
          placeholder="Search simulations..." 
          value={query} 
          onChange={(e) => { setQuery(e.target.value) }}
        />
        <div className={styles.simsearchFilters}>
          <button className={styles.simsearchBtn} onClick={() => setQuery('mechanics')}>Mechanics</button>
          <button className={styles.simsearchBtn} onClick={() => setQuery('waves')}>Waves</button>
          <button className={styles.simsearchBtn} onClick={() => setQuery('particle')}>Particle</button>
          <button className={styles.simsearchClearBtn} onClick={() => setQuery('')}>Clear</button>
        </div>
      </div>
      <div className={styles.simsearchSims}>
        {filtered.map((sim, idx) => {
          return (
            <a className={styles.simcardWrapper} key={idx} href={sim.href}>
              <div className={styles.simcardContainer}>
                <h2 className={styles.simcardTitle}>{sim.title}</h2>
                <p className={styles.simcardDescription}>{sim.description}</p>
                <div className={styles.simcardTags}>
                  {sim.tags.map((tag, tagIdx) => (
                    <span className={styles.simcardTag} key={tagIdx}>{tag}</span>
                  ))}
                </div>
              </div>
              <img className={styles.simcardImg} src={sim.thumbnail} alt={sim.title}/>
            </a>
          )
        })}
        <p className={styles.simsearchNoResults}>Showing {filtered.length} results.</p>
      </div>
    </div>
  )
}