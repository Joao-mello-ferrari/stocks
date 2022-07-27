interface ActionTypeRowProps{
  type: 'buy' | 'sell';
}

export function ActionTypeRow({ type }: ActionTypeRowProps){
  return(
    <td>
      <span
        style={{
          padding: '0.2rem 0.6rem',
          borderRadius: '0.25rem',
          background: type === 'buy' ? '#96BF8D' : '#9EB0FF',
        }}
      >
        {type === 'buy' ? 'C' : 'V'}
      </span>
    </td>
  )
}