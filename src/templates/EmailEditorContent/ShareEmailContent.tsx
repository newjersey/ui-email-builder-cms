import React, { FC, ReactElement, Children } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ButtonLike } from 'src/ui'
import { useDidMount } from 'src/utils/useDidMount'
import { DownloadIcon } from 'src/ui/Svg/DownloadIcon'

interface Props {
  children: (ReactElement | null | boolean)[]
}

export const ShareEmailContent: FC<Props> = ({ children }) => {
  const mounted = useDidMount()

  if (!mounted) return null

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ButtonLike aria-label="Share" className="share-trigger">
          <DownloadIcon />
        </ButtonLike>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="share-buttons" sideOffset={5}>
          {Children.map(children, (child) => (
            <DropdownMenu.Item asChild className="DropdownMenuItem">
              {child}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
