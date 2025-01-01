declare type ProjectBoxLinkProps = ProjectMeta & {
  link: string
}

declare type ProjectBoxProps = ProjectBoxLinkProps | RegisteredProject
