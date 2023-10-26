import { NodeDataType } from '@/components/pages/Editor'
import { Handle, Position } from 'react-flow-renderer'

interface RegularNodeProps {
  data: NodeDataType
  selected: boolean
}

export const RegularNode = ({ data, selected }: RegularNodeProps) => {
  return (
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
              ? 'rounded border-sky-300 bg-gradient-to-b from-white to-whitegrad border-2 justify-start items-left shadow-md'
              : 'rounded border-white bg-gradient-to-b from-white to-whitegrad border-2 justify-start items-left'
          }
          /*style={{ borderColor: data.color }}*/
        >
          <div className='relative max-w-md flex inline p-2'>
          <div className="flex justify-start self-center w-32 h-auto text-xs font-semibold text-cyan-900">
              {data.name}
            </div>
          <div className="h-4 w-4 bg-no-repeat bg-bottom bg-contain fill-cyan-900" style={{ backgroundImage: "url('calculation.svg')", bottom: "-10px" }}>
            
           

          </div>
          <Handle type="target" position={Position.Top} className="w-4 h-2 rounded-none bg-transparent border-0 bg-no-repeat bg-top" style={{ backgroundImage: "url('topHandle.svg')", top: "-10px" }} />
          <Handle type="source" position={Position.Bottom} className="w-4 h-2 rounded-none bg-transparent border-0 bg-no-repeat bg-bottom" style={{ backgroundImage: "url('bottomHandle.svg')", bottom: "-10px" }} />
        </div>
      </div>
    </div>
  )
}


