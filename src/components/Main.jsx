import React, { useState, useEffect } from 'react';
import Button from './Button';

import styles from './Main.module.css'



function Main() {

  var [cells, setCells] = useState(new Array(8).fill(0))
  var [number, setNumber] = useState(Math.floor(Math.random() * 255) + 1)
  var [unknown, setUnknown] = useState(false)
  var [blur, setBlur] = useState(false)
  var [winPanel,setWinPanel] = useState(false)
  


  const win = () => {
    setBlur(true)
    setWinPanel(true)
  }

  const getBlur = () => {
    if(blur) return {filter: 'blur(10px)'}
  }
  const getWinPanel = () => {
    if(winPanel) return {display: 'grid'}
    else return {display: 'none'}
  }

  const reset = () => {
    if(!winPanel) return
    setBlur(false)
    setWinPanel(false)
    setUnknown(false)
    setCells(new Array(8).fill(0))
    setNumber(Math.floor(Math.random() * 255) + 1)
  }

  const setCellValue = (index) => {
    if(winPanel) reset()

    let clone = new Array(8)
    for (let i = 0; i < 8; ++i) {
      if (i === index) cells[i] ? clone[i] = 0 : clone[i] = 1
      else clone[i] = cells[i]
    }
    setCells(clone)
  }

  const getTwoSystem = (number) => {
    let str = number.toString(2), MyZero = ''
    for (let i = 0; i < (8 - str.length); ++i) MyZero += '0'
    return MyZero + str
  }
  const getUserValue = (num) => {
    return parseInt(num.join(''), 2).toString()
  }
  const getStrFromNumber = (arr) => arr.join('')

  const check = () => {
    let val = getStrFromNumber(cells), str = getTwoSystem(number)
    if (val === str) win()
  }
  const getDifference = () => {
    let val = getStrFromNumber(cells), str = getTwoSystem(number)
    if (val > str) return 'Перебор'
    else return 'Недобор'
  }
  const unknownPanel = () => {
    if (!unknown) return 'Показать искомое число'
    else return number
  }

  useEffect(check, [cells])




  return (
    <div>

      <div className={styles.win} style={getWinPanel()}>
        <button className={styles.winClose} onClick={reset}>закрыть</button>
        <code className={styles.winText}>Вы угадали число</code>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={styles.grid}  style={getBlur()}>

        <div className={styles.info}>
          <code className={styles.x}>Ваше число: {getUserValue(cells)}</code>
          <code className={styles.x}>{getDifference()}</code>
        </div>

        <div className={styles.panel}>
          <Button classMode={styles.cellLeft} val={cells[0]} click={() => { setCellValue(0) }} ></Button>
          <Button classMode={styles.cell} val={cells[1]} click={() => { setCellValue(1) }}     ></Button>
          <Button classMode={styles.cell} val={cells[2]} click={() => { setCellValue(2) }}     ></Button>
          <Button classMode={styles.cell} val={cells[3]} click={() => { setCellValue(3) }}     ></Button>
          <Button classMode={styles.cell} val={cells[4]} click={() => { setCellValue(4) }}     ></Button>
          <Button classMode={styles.cell} val={cells[5]} click={() => { setCellValue(5) }}     ></Button>
          <Button classMode={styles.cell} val={cells[6]} click={() => { setCellValue(6) }}     ></Button>
          <Button classMode={styles.cellRight} val={cells[7]} click={() => { setCellValue(7) }}></Button>
        </div>

        <button className={styles.result} onClick={() => setUnknown(!unknown)} >{unknownPanel()}</button>

      </div>
    </div>
  );
}

export default Main;
