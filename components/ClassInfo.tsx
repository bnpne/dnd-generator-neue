import useSWR from 'swr'

const fetcher = args => fetch(args).then(res => res.json())

const ClassInfo = info => {
  console.log(info.info)
  var URL = `https://www.dnd5eapi.co/api/classes/${info.info}`

  const { data, error } = useSWR(URL, fetcher)

  if (!data) return <div>Loading</div>

  // console.log(data)

  return (
    <div>
      <div className="space-y-5">
        <h2>
          <span className="font-bold underline">Hit Die:</span> {data.hit_die}
        </h2>
        <h2 className="font-bold underline">Saving Throws:</h2>
        <ul className="list-inside list-decimal">
          {data.saving_throws.map(name => {
            return <li>{name.name}</li>
          })}
        </ul>
        <h2 className="font-bold underline">Proficiencies:</h2>
        <ul className="list-inside list-decimal">
          {data.proficiencies.map(name => {
            return <li>{name.name}</li>
          })}
        </ul>
        <h2 className="font-bold underline">Proficiency Choices:</h2>
        <ul className="list-inside list-decimal">
          {data.proficiency_choices.map(name => {
            return (
              <div>
                <p className="pb-2 font-bold">Choose {name.choose} from:</p>
                <ul className="pb-4">
                  {name.from.map(from => {
                    return <li>{from.name}</li>
                  })}
                </ul>
              </div>
            )
          })}
        </ul>
        <h2 className="font-bold underline">Starting Equipment:</h2>
        <ul className="list-inside list-decimal">
          {data.starting_equipment.map(name => {
            return (
              <li>
                {name.equipment.name} x{name.quantity}
              </li>
            )
          })}
        </ul>
        {data.spellcasting && (
          <div>
            <h2 className="font-bold underline pb-4">Spellcasting:</h2>
            <ul className="list-inside">
              {data.spellcasting.info.map(name => {
                return (
                  <li>
                    <p className="pb-2 font-bold">{name.name}</p>
                    <p className="pb-4">{name.desc} </p>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassInfo
