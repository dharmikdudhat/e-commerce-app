/* eslint-disable react/prop-types */

import { AlertTriangle, X } from 'lucide-react'

export function AlertBanner(props) {
  return (
    <>
      <div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">
              {props.text}
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-red-600" />
          </div>
        </div>
      </div>
    </>
  )
}
