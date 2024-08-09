import "./App.css"
import {useState, useEffect} from 'react'
import _ from "lodash"
import classnames from "classnames"

export default function Game({data}){
  const [dataArray, setDataArray] = useState([]);
  const [selected, setSelected] = useState([])
  const [correctSelection, setCorrectSelection] = useState([])

  const shuffleDataFn = ()=>{
    let arrayFromData = Object.entries(data).flat()
    let shuffledData = _.shuffle(arrayFromData);
    setDataArray(shuffledData)
  }

  const handleOnClick = (selectedIndex)=>{
    // this is index only, if need value dataArray[selectedIndex]
    let newSelected = selected.concat(selectedIndex)
    let newArray = [...dataArray];
    setSelected(newSelected)
    if(newSelected.length === 2) {
      const [index1, index2] = newSelected
      const option1 = dataArray[index1]
      const option2 = dataArray[index2]
      if (data[option1] === option2 || data[option2] === option1) {
        setCorrectSelection(newSelected)
        _.pullAt(newArray, [newSelected[0], newSelected[1]])
        setTimeout(()=>{
          setDataArray(newArray)
          setSelected([])
          setCorrectSelection([])
        }, 1000)
      } else {
        setTimeout(() => {
          setSelected([])
        }, 1000)
      }
    }
  }

  useEffect(()=>{
    shuffleDataFn();
  },[])

return (

    dataArray.length ?

    <div className="game">
      {dataArray.map((item, index)=>{
        const isSelected = selected.includes(index)
        const isCorrect = correctSelection.includes(index)
        const isIncorrect = selected.length===2 && isSelected && !isCorrect
        const isDisabled = selected.length === 2 && !isSelected

        return (<button
          className={classnames(
              isSelected && 'selected-button',
              isIncorrect && 'selected-incorrect',
              isCorrect && 'selected-correct'
          )}
          disabled={ isDisabled && true}
          key={index}
          onClick={()=>handleOnClick(index)}
        >{item}</button>)
      })}
    </div>
   :

    <div className="game">
         <h2> Congratulations!</h2>
    </div>
  )


}
