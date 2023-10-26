import { NodeDataType } from '@/components/pages/Editor'
import { Handle, Position } from 'react-flow-renderer'

interface HoriNodeProps {
  data: NodeDataType
  selected: boolean
}

export const HoriNode = ({ data, selected }: HoriNodeProps) => {
  return (
    <>
      <div
        className={
          selected
            ? 'rounded shadow-lg'
            : 'rounded shadow-md'
        }
      >
        <div
          className={
            selected
              ? 'rounded border-sky-300 bg-gradient-to-b from-white to-whitegrad border-2 shadow-md'
              : 'rounded border-white bg-gradient-to-b from-white to-whitegrad border-2'
          }
          /*style={{ borderColor: data.color }}*/
        >
          <div className='relative max-w-md flex inline p-2'>
            <div className="flex justify-start self-center w-32 h-auto text-xs font-semibold text-cyan-900">
              {data.name}
            </div>
            <div className="h-4 w-4 bg-no-repeat bg-bottom fill-cyan-900 bg-contain" style={{ backgroundImage: "url('retagging.svg')", bottom: "-10px" }}>

            </div>
          </div>

          <Handle type="target" position={Position.Left} className="w-2 h-4 rounded-none bg-transparent border-0 bg-no-repeat bg-left" style={{ backgroundImage: "url('leftHandle.svg')", left: "-8px" }} />
          <Handle type="source" position={Position.Right} className="w-2 h-4 rounded-none bg-transparent border-0 bg-no-repeat bg-right" style={{ backgroundImage: "url('rightHandle.svg')", right: "-8px" }} />
        </div>
      </div>
    </>
  )
}


