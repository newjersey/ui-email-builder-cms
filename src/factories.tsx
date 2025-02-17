import { faker } from '@faker-js/faker'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import {
  BannerValue,
  DepartmentSealValue,
  DisclaimerValue,
  EmailParts,
  EmailTemplate,
  StateSealValue,
} from './appTypes'
import uniqueId from 'lodash.uniqueid'
import sample from 'lodash.sample'
import {
  EmailTemplateIndexItem,
  EmailTemplateIndexGroup,
  EmailTemplateIndex,
} from './network/emailTemplates'
import { StateAbbreviation } from './utils/statesAndTerritories'
import { DEPARTMENT_SEALS } from './utils/departmentSeals'
import { UsersIndex, UserShow } from './network/users'
import { GroupsIndex, GroupShow, GroupShowUser } from './network/groups'
import { EmailTranslation } from './appTypes/EmailTranslation'
import { currentTimestamp } from './utils/currentTimestamp'

export const randomObject = () => {
  return { [faker.lorem.word()]: faker.lorem.words(3) }
}

export const randomBannerValue = (): BannerValue => {
  return {
    primaryLink: faker.internet.url(),
    primaryText: faker.lorem.words(3),
    backgroundColor: faker.color.rgb(),
    secondaryLink: faker.internet.url(),
  }
}

export const randomDepartmentSealValue = (): DepartmentSealValue => {
  return {
    seal: sample(DEPARTMENT_SEALS)!.imageName,
  }
}

export const randomStateSealValue = (): StateSealValue => {
  return {
    stateAbbreviation: sample(['AK', 'CA', 'NJ', 'NY']) as StateAbbreviation,
    additionalDisclaimer: faker.lorem.paragraph(),
  }
}

export const randomDisclaimerValue = (text?: string): DisclaimerValue => {
  return {
    content: [{ type: 'paragraph', children: [{ text: text ?? faker.lorem.paragraph() }] }],
  }
}

export const buildEmailTemplateSubComponent = <K extends EmailParts.Kinds.SubComponent>(
  options: { kind: K } & Partial<EmailParts.Base.SubComponent<K>>,
): EmailParts.Base.SubComponent => {
  return {
    required: false,
    ...options,
  }
}

export const buildUniqueEmailSubComponent = <T extends EmailParts.Kinds.SubComponent>(
  options: { kind: T } & Partial<EmailParts.Unique.SubComponent<T>>,
): EmailParts.Unique.SubComponent<T> => {
  return {
    required: false,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateComponent = <T extends EmailParts.Kinds.Component>(
  kind: T,
  options?: Partial<EmailParts.Base.Component<T>>,
): EmailParts.Base.Component<T> => {
  return {
    kind,
    required: false,
    ...options,
  }
}

export const buildUniqueEmailComponent = <T extends EmailParts.Kinds.Component>(
  kind: T,
  options?: Partial<EmailParts.Unique.Component<T>>,
): EmailParts.Unique.Component<T> => {
  const { subComponents, ...emailComponent } = buildEmailTemplateComponent(kind, options)
  return {
    ...emailComponent,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateConfig = (
  options?: Partial<EmailTemplate.Base.Config>,
): EmailTemplate.Base.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    translations: [
      buildBaseEmailTranslation({
        components: [buildEmailTemplateComponent('Header'), buildEmailTemplateComponent('Footer')],
      }),
    ],
    ...options,
  }
}

export const buildUniqueEmailConfig = (
  options?: Partial<EmailTemplate.Unique.Config>,
): EmailTemplate.Unique.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    translations: [
      buildEmailTranslation({
        components: [buildUniqueEmailComponent('Header'), buildUniqueEmailComponent('Footer')],
      }),
    ],
    versionTimestamp: currentTimestamp(),
    ...options,
  }
}

export const buildEmailTemplateIndexItem = (
  options?: Partial<EmailTemplateIndexItem>,
): EmailTemplateIndexItem => {
  return {
    id: uniqueId(),
    userId: uniqueId(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    updatedAt: new Date().toISOString(),
    ...options,
  }
}

export const buildEmailTemplateIndexGroup = (
  options?: Partial<EmailTemplateIndexGroup>,
): EmailTemplateIndexGroup => {
  const groupId = uniqueId()
  return {
    id: groupId,
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    templates: [],
    ...options,
  }
}

export const buildEmailTemplateIndex = (
  options?: Partial<EmailTemplateIndex>,
): EmailTemplateIndex => {
  return {
    user: [buildEmailTemplateIndexItem()],
    groups: [buildEmailTemplateIndexGroup()],
    ...options,
  }
}

export const buildBaseEmailTranslation = (
  attributes?: Partial<EmailTranslation.Base>,
): EmailTranslation.Base => {
  return {
    language: 'english',
    components: [buildEmailTemplateComponent('Header')],
    previewText: faker.lorem.paragraph(),
    ...attributes,
  }
}

export const buildEmailTranslation = (
  attributes?: Partial<EmailTranslation.Unique>,
): EmailTranslation.Unique => {
  return {
    language: 'english',
    components: [buildUniqueEmailComponent('Header')],
    previewText: faker.lorem.paragraph(),
    ...attributes,
  }
}

const buildUser = (): UserShow => ({
  id: uniqueId(),
  email: faker.internet.email(),
  role: 'member',
})

export const buildTag = () => {
  return {
    id: uniqueId(),
    name: faker.lorem.word(),
  }
}

export const buildUserShow = (options?: Partial<UserShow>): UserShow => {
  return {
    ...buildUser(),
    ...options,
  }
}

export const buildUserIndex = (options?: Partial<UsersIndex>): UsersIndex => {
  return {
    ...buildUser(),
    ...options,
  }
}

export const buildGroupUserIndex = (options?: Partial<GroupShowUser>): GroupShowUser => {
  return {
    ...buildUser(),
    membershipId: uniqueId(),
    ...options,
  }
}

export const buildUserMembershipIndex = (options?: Partial<UsersIndex>): UsersIndex => {
  return {
    ...buildUser(),
    ...options,
  }
}

const buildGroup = (): GroupsIndex => ({
  id: uniqueId(),
  name: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
  members: [],
})

export const buildGroupIndex = (options?: Partial<GroupsIndex>): GroupsIndex => {
  return {
    ...buildGroup(),
    ...options,
  }
}

export const buildGroupShow = (options?: Partial<GroupShow>): GroupShow => {
  return {
    ...buildGroup(),
    users: [],
    ...options,
  }
}

export const buildGroupMembershipIndex = (options?: Partial<GroupsIndex>): GroupsIndex => {
  return {
    ...buildGroup(),
    ...options,
  }
}

interface Membership {
  id: string
  userId: string
  groupId: string
}

export const buildMembershipShow = (options?: Partial<Membership>): Membership => {
  return {
    id: uniqueId(),
    groupId: uniqueId(),
    userId: uniqueId(),
    ...options,
  }
}

export const buildUseQueryResult = <T extends any>(
  options?: Partial<UseQueryResult<T>>,
): UseQueryResult<T> => {
  return {
    data: undefined as any,
    dataUpdatedAt: 0,
    error: null as any,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'fetching',
    isError: false as any,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: false,
    isInitialLoading: false,
    isLoading: false as any,
    isLoadingError: false as any,
    isPaused: false,
    isPending: false as any,
    isPlaceholderData: false,
    isRefetchError: false as any,
    isRefetching: false,
    isStale: false,
    isSuccess: true as any,
    refetch: jest.fn(),
    status: 'success',
    promise: new Promise(() => {}),
    ...options,
  }
}

export const buildUseMutationResult = <
  T extends UseMutationResult<D, E, V, C>,
  D = any,
  E = any,
  V = any,
  C = any,
>(
  options?: Partial<T>,
): T => {
  return {
    status: 'idle',
    data: undefined,
    variables: undefined,
    error: null,
    isError: false,
    isIdle: true,
    isPaused: false,
    isPending: false,
    isSuccess: false,
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    reset: jest.fn(),
    context: undefined,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    ...options,
  } as any
}
