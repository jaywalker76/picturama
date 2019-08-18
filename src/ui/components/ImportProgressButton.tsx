import React from 'react'
import classnames from 'classnames'
import { Popover, Position, Button, Spinner, Icon } from '@blueprintjs/core'

import { msg } from 'common/i18n/i18n'
import { bindMany } from 'common/util/LangUtil'
import { ImportProgress } from 'common/CommonTypes'

import './ImportProgressButton.less'


export interface Props {
    className?: any
    progress: ImportProgress
}

interface State {
    isShowingPopover: boolean
}

export default class ImportProgressButton extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { isShowingPopover: false }
        bindMany(this, 'onOpening', 'onClosed')
    }

    private onOpening() {
        this.setState({ isShowingPopover: true })
    }

    private onClosed() {
        this.setState({ isShowingPopover: false })
    }

    render() {
        const { props, state } = this
        const { progress } = props

        const spinnerProgress = progress.phase === 'import-photos' ? progress.processed / Math.max(1, progress.total) : undefined
        const hasError = progress.phase === 'error'

        const popoverContent = (
            <div className='ImportProgressButton-popoverBody'>
                {state.isShowingPopover &&
                    <>
                        <div className='ImportProgressButton-phase'>
                            {msg(`ImportProgressButton_phase_${progress.phase.replace(/-/g, '_')}` as any)}
                        </div>
                        {progress.currentPath &&
                            <div className='ImportProgressButton-currentPath'>
                                {progress.currentPath}
                            </div>
                        }
                        {spinnerProgress &&
                            <div className='ImportProgressButton-percent'>
                                {`${Math.round(spinnerProgress * 100)}%`}
                            </div>
                        }
                        {progress.phase !== 'cleanup' &&
                            <div className='ImportProgressButton-ratio'>
                                {spinnerProgress ? msg('ImportProgressButton_ratio', progress.processed, progress.total) : progress.total}
                            </div>
                        }
                    </>
                }
            </div>
        )

        return (
            <Popover
                className={classnames(props.className, 'ImportProgressButton')}
                content={popoverContent}
                position={Position.TOP}
                onOpening={this.onOpening}
                onClosed={this.onClosed}
            >
                <Button minimal={true} rightIcon='caret-up'>
                    {!hasError &&
                        <Spinner size={20} value={spinnerProgress} />
                    }
                    {hasError &&
                        <Icon className='ImportProgressButton-error' icon='error' iconSize={20} />
                    }
                </Button>
            </Popover>
        )

    }

}
