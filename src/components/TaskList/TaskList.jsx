import { Table, Tag, Space, Button, Popconfirm } from 'antd'
import dayjs from 'dayjs'

export default function TaskList({ data, onEdit, onDelete }) {
    const cols = [
        { title: 'Title', dataIndex: 'title', key: 'title', ellipsis: true, width: 220 },
        { title: 'Due', dataIndex: 'dueDate', key: 'dueDate', render: v => v ? dayjs(v).format('YYYY-MM-DD') : '-', width: 120, responsive: ['sm'] },
        { title: 'Status', dataIndex: 'status', key: 'status', render: s => s === 'done' ? <Tag color="green">Done</Tag> : s === 'in_progress' ? <Tag color="blue">In Progress</Tag> : <Tag color="orange">Pending</Tag>, width: 140 },
        { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', render: v => dayjs(v).format('YYYY-MM-DD HH:mm'), width: 170, responsive: ['md'] },
        {
            title: 'Actions',
            key: 'actions',
            width: 170,
            render: (_, r) => (
                <Space wrap>
                    <Button onClick={() => onEdit(r)} size="small">Edit</Button>
                    <Popconfirm title="Delete task?" onConfirm={() => onDelete(r)}>
                        <Button danger size="small">Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="table-scroll">
            <Table
                rowKey="id"
                columns={cols}
                dataSource={data}
                pagination={{ pageSize: 8, size: 'small' }}
                scroll={{ x: 'max-content' }}
            />
        </div>
    )
}
