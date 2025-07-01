
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SMSNode from './flow-nodes/SMSNode';
import EmailNode from './flow-nodes/EmailNode';
import TriggerNode from './flow-nodes/TriggerNode';
import DelayNode from './flow-nodes/DelayNode';

const nodeTypes = {
  sms: SMSNode,
  email: EmailNode,
  trigger: TriggerNode,
  delay: DelayNode,
};

const initialNodes: Node[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'Student Late', type: 'attendance' },
  },
];

const initialEdges: Edge[] = [];

interface FlowBuilderProps {
  onFlowChange: (nodes: Node[], edges: Edge[]) => void;
}

const FlowBuilder = ({ onFlowChange }: FlowBuilderProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(2);

  const onConnect = useCallback((params: Connection) => {
    const newEdge = addEdge(params, edges);
    setEdges(newEdge);
    onFlowChange(nodes, newEdge);
  }, [edges, nodes, onFlowChange]);

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${type}-${nodeId}`,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 300 + 200 },
      data: { 
        label: type === 'sms' ? 'Send SMS' : 
               type === 'email' ? 'Send Email Report' : 
               type === 'delay' ? 'Wait 30 minutes' : 'New Node',
        content: type === 'sms' ? 'Dear {ParentName}, {StudentName} is late for school.' : 
                type === 'email' ? 'Late student report for {Date}' : '',
        delay: type === 'delay' ? 30 : undefined,
        email: type === 'email' ? '' : undefined,
      },
    };
    
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    setNodeId(nodeId + 1);
    onFlowChange(newNodes, edges);
  };

  const handleNodesChange = useCallback((changes: any) => {
    onNodesChange(changes);
    // Get updated nodes after changes
    setTimeout(() => {
      onFlowChange(nodes, edges);
    }, 0);
  }, [nodes, edges, onFlowChange, onNodesChange]);

  return (
    <div className="h-96 border border-gray-300 rounded-lg relative">
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <Button size="sm" onClick={() => addNode('sms')} className="bg-blue-600">
          <Plus className="h-3 w-3 mr-1" />
          SMS
        </Button>
        <Button size="sm" onClick={() => addNode('email')} className="bg-green-600">
          <Plus className="h-3 w-3 mr-1" />
          Email
        </Button>
        <Button size="sm" onClick={() => addNode('delay')} className="bg-orange-600">
          <Plus className="h-3 w-3 mr-1" />
          Delay
        </Button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
