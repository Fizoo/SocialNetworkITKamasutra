import React, {useState} from 'react';
import styles from './pagination.module.css'
import cn from 'classnames';
import Pagination from "react-js-pagination";




const Paginations = ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize=10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount =Math.ceil(pagesCount / pageSize);
    let [portionNumber ,setPortionNumber] =useState(1)
    let leftPortionNumber=(portionNumber-1)*portionSize+1;
    let rightPortionNumber=portionNumber*portionSize;
    let [activePage,setActivePage]=useState(1)
    const handlePageChange =(e)=>{
        setActivePage(currentPage);


    }
    return(

        <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={10}
            onChange={onPageChanged}
            itemClass={ styles.pagi}
            linkClass={styles.pagiA}
            activeLinkClass={styles.activeLink}

        />
        /*<div className={styles.pagination}>
        {
            portionCount>1 &&
            <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Prev</button>
        }
        {
            pages.filter(p=>p>=leftPortionNumber&&p<=rightPortionNumber)
                .map(p=>{

                    return <span
                        className={cn({[styles.selectedPage]:currentPage===p},styles.pageNumber)}
                        key={p}
                        onClick={(e)=>onPageChanged(p)}>
                        {p}
                    </span>
                    })
        }
        {
            portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>
        }

        </div>*/

    )

};

export default Paginations;
