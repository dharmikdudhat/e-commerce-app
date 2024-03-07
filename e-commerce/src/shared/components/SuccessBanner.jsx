/* eslint-disable react/prop-types */

import { MailCheck, X } from 'lucide-react'

export function SuccessBanner(props) {
  return (
    <>
      <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <MailCheck className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">
              {props.text}
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-green-600" />
          </div>
        </div>
      </div>
    </>
  )
}
