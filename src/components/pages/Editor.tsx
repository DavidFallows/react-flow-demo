import { RegularNode } from '@/components/molecules/RegularNode'
import { HoriNode } from '@/components/molecules/HoriNode'
import { EventNode } from '@/components/molecules/EventNode'
import { EditorSidePanel } from '@/components/organisms/EditorSidePanel'
import { useGetWindowSize } from '@/hooks/useGetWindowSize'
import { useCallback, useState } from 'react'


import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  MarkerType,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  FitViewOptions,
  Node,
  NodeChange,
  OnSelectionChangeParams,
  updateEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from 'react-flow-renderer'

export type NodeDataType = {
  label: string
  name: string
  color: string
  image: string
}

const initialNodes: Node<NodeDataType>[] = [
  {
    id: '1',
    data: {
      label: 'Node 1',
      name: 'Retag Filter',
      color: '#38B5AD',
      image: 'iconFilter'
    },
    position: { x: 5, y: 0 },
    type: 'regularNode',
  },
  {
    id: '2',
    data: {
      label: 'Node 2',
      name: 'First Calc.',
      color: '#FF5660',
      image: 'iconFilter'
    },
    position: { x: 25, y: 100 },
    type: 'regularNode',
  },
  {
    id: '3',
    data: {
      label: 'Node 3',
      name: 'Second Calc.',
      color: '#FF5660',
      image: 'iconFilter'
    },
      position: { x: 100, y: 400 },
    type: 'regularNode',
  },
  { 
    id: '4',
    position: { x: 240, y: 50 },
    type: 'horiNode',
    data: {
      label: 'Node 4',
      name: 'Dummy Component',
      color: '#FFFFFF',
      image: 'iconFilter'
    },
  },
  { 
    id: '5',
    position: { x: 240, y: 100 },
    type: 'horiNode',
    data: {
      label: 'Node 5',
      name: 'Retag Process',
      color: '#FFFFFF',
      image: 'iconFilter'
    },
  },
  { 
    id: '6',
    position: { x: 240, y: 150 },
    type: 'horiNode',
    data: {
      label: 'END NODE',
      name: 'Retag Process #2',
      color: '#FFFFFF',
      image: 'iconFilter'
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  {
    id: 'f2-3', source: '2', target: '3', markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
      color: '#90C783',
    },
    label: 'Context',
    data: {
      startLabel: 'start edge label',
      endLabel: 'end edge label',
    },
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#90C783',
    },
  },
  {
    id: 'f2-3b', source: '2', target: '3', markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 12,
      height: 12,
    },
    label: 'Context',
    style: {
      strokeWidth: 1,
    },
  },
]

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const nodeTypes = { 
  eventNode: EventNode, 
  regularNode: RegularNode, 
  horiNode: HoriNode,
 }

export const Editor = () => {
  const { height: windowHeight, width: windowWidth } = useGetWindowSize()
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  )
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  )

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [],
  )

  const onSelectionChange = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams) => {
      const selectedNodes = nodes.filter((node) => node.selected)
      if (selectedNodes.length === 0) setSelectedNode(null)
      if (selectedNodes.length === 1) setSelectedNode(selectedNodes[0])
    },
    [],
  )

  const AddNodeOnEdgeDrop = () => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { project } = useReactFlow();
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onConnectStart = useCallback((_, { nodeId }) => {
      connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
      (event) => {
        const targetIsPane = event.target.classList.contains('react-flow__pane');

        if (targetIsPane) {
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
          const id = getId();
          const newNode = {
            id,
            // we are removing the half of the node width (75) to center the new node
            position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
            data: { label: `Node ${id}` },
          };

          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
        }
      },
      [project]
    );
    
    return (
      <div className="wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          fitViewOptions={fitViewOptions}
        />
      </div>
    );
  };

  return (
    <div style={{ height: windowHeight, width: windowWidth }}>
      {windowWidth > 0 && windowHeight > 0 ? (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          nodeTypes={nodeTypes}
          onSelectionChange={onSelectionChange}
          fitView
          fitViewOptions={fitViewOptions}
        >
          <Controls />
          <Background style={{ backgroundColor: '#f5f5f5' }} />
        </ReactFlow>
      ) : undefined}
      {selectedNode && (
        <EditorSidePanel
          node={selectedNode}
          settings={{ sampleProperty: 'aaa' }}
        />
      )}
    </div>
  )
}
